import {Router} from 'express';
import { approveProfile, getUser } from '../data/users.js';
import eventRoutes from "./events.js";
import activityRoutes from "./activities.js";

//import {logMiddleware,redirectMiddleware,registerRedirectMiddleware,loginRedirectMiddleware,logoutMiddleware,protectedMiddleware,adminMiddleware} from '../middleware.js';
import { loginUser, createUser, getUnapprovedUsers, updateProfile } from '../data/users.js';

const router = Router();

router.route('/').get(async (req, res) => {
  if (!req.session.user) {
    // Redirect non-authenticated users to the login route
    return res.redirect('/login');
}else{
  if (req.session.user.role === 'admin') {
    res.redirect('/admin');
} else {
  if(req.session.user.isAdminApproved){
      res.redirect('/home');
  }else{
      res.redirect('/approval');
  }
}
}
});


router
  .route('/register')
  .get(async (req, res) => {
  res.render('register');
  })
  .post(async (req, res) => {
    //code here for POST
    const firstName = req.body.firstNameInput;
    const lastName = req.body.lastNameInput;
    const emailAddress = req.body.emailAddressInput;
    const userName = req.body.usernameInput;
    const password = req.body.passwordInput;
    const confirmPassword = req.body.confirmPasswordInput;
    //const role = req.body.roleInput;
    
    if(password == confirmPassword){
      try{
        const result = await createUser(firstName, lastName, emailAddress, userName, password);

        if (result.insertedUser) {
            // If user is successfully registered, redirect to login page
            res.redirect('/login');
        } else {
            // If registration fails due to internal server error
            res.status(500).send('Internal Server Error');
        }
  
      }catch (error) {
        console.log(error.message);
        const jj = error.message;
        res.render('error', { errorMessage: jj });
      }
    }else{
      console.log("not same passsword");
      res.render('error', { errorMessage: "Confirm Password and Password fields are not same." });
    }

  });



  router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
  res.render('login');
  })
  .post(async (req, res) => {
    //code here for POST
    const emailAddress = req.body.emailAddressInput;
    const password = req.body.passwordInput;
  
      try{
        const loggedIn = await loginUser(emailAddress,password);
        console.log("routes -> "+ loggedIn.isAdminApproved)
        // Storing user information in session
        req.session.user = {
          userId: loggedIn.id,
          firstName: loggedIn.firstName,
          lastName: loggedIn.lastName,
          emailAddress: loggedIn.emailAddress,
          userName: loggedIn.userName,
          reviews:loggedIn.reviews,
          isAdminApproved: loggedIn.isAdminApproved,
          role:loggedIn.role
      };

    
      if (loggedIn.role === 'admin') {
          res.redirect('/admin');
      } else {
        if(loggedIn.isAdminApproved){
            res.redirect('/home');
        }else{
            res.redirect('/approval');
        }
          
      }
  
      }catch (error) {
        console.log(error.message);
        res.render('error', { errorMessage: error.message });
      }
   
  });


  router.route('/home').get(async (req, res) => {
    const userId = req.session.user?.userId; // Get user ID from session

    if (!userId) {
      return res.status(401).render("error", {
        errorMessage: "Unauthorized access. Please log in.",
      });
    }
  
      res.render('home');
  
  });


  router.route('/approval').get(async (req, res) => {
  
    const userId = req.session.user?.userId; // Get user ID from session

      if (!userId) {
        return res.status(401).render("error", {
          errorMessage: "Unauthorized access. Please log in.",
        });
      }
      res.render('approval');
  
  });


  router.route('/admin').get(async (req, res) => {
    //code here for GET
    const userId = req.session.user?.userId; // Get user ID from session

      if (!userId) {
        return res.status(401).render("error", {
          errorMessage: "Unauthorized access. Please log in.",
        });
      }
  
    const unapprovedUsers = await getUnapprovedUsers();
    console.log(unapprovedUsers);
        res.render('admin', { users: unapprovedUsers });
  
    //res.render('admin',{firstName: firstName, lastName: lastName, currentTime: currentTime});
    
  });

router.post("/admin/approve", async (req, res) => {
  const { userId } = req.body;

  try {
    const updatedUser = await approveProfile(userId); // Approve the user
    res.status(200).json({ success: true, user: updatedUser }); // Send success response
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() }); // Send error response
  }
})

  router
    .route("/editprofile")
    .get(async (req, res) => {
      const userId = req.session.user?.userId; // Get user ID from session

      if (!userId) {
        return res.status(401).render("error", {
          errorMessage: "Unauthorized access. Please log in.",
        });
      }

      try {
        const user = await getUser(userId); // Fetch user details
        res.render("editprofile", {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        }); // Pass user details to the form for placeholder values
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).render("error", {
          errorMessage: "Internal server error.",
        });
      }
    })
    .post(async (req, res) => {
      const userId = req.session.user?.userId;

      if (!userId) {
        return res.status(401).render("error", {
          errorMessage: "Unauthorized access. Please log in.",
        });
      }

      // Get form data
      const { firstNameInput, lastNameInput, usernameInput } = req.body;

      // Basic server-side validation
      if (!firstNameInput || !lastNameInput || !usernameInput) {
        return res.render("error", {
          errorMessage:
            "All fields are required. Please fill out the form completely.",
        });
      }

      try {
        const editStatus = await updateProfile(
          userId,
          firstNameInput,
          lastNameInput,
          usernameInput
        );

        if (!editStatus) {
          throw new Error("Profile update failed");
        }

        res.render("messages", {
          generalMessage: "Profile updated successfully!",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        res.render("error", {
          errorMessage: "Could not update profile. Please try again later.",
        });
      }
    });


  router.route('/error').get(async (req, res) => {
 
    const statusCode = req.query.status || 500;
      const errorMessage = req.query.message || 'Internal Server Error';
      res.status(statusCode).render('error', { errorMessage: errorMessage });
  });
  
  router.route('/logout').get(async (req, res) => {
    //code here for GET
    res.clearCookie('AuthState');
  
  req.session.destroy((err) => {
    if (err) {
        console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
  });

  router.get('/events',(req,res)=>{
    const userId = req.session.user?.userId; 
    if (!userId) {
      return res.status(401).render("error", {
        errorMessage: "Unauthorized access. Please log in.",
      });
    }
    res.render("events")
  })

  router.get("/activities", (req, res) => {
    const userId = req.session.user?.userId;
    if (!userId) {
      return res.status(401).render("error", {
        errorMessage: "Unauthorized access. Please log in.",
      });
    }
    res.render("activities");
  });
  
  export default router;

