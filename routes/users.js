import {Router} from 'express';

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
    //code here for GET
   
      //const {  role } = req.session.user;
     // const currentTime = new Date().toLocaleString(); // Assuming you want the time in a readable format
  
      // Check if user is admin
     // const isAdmin = role === 'admin';
  
      res.render('home');
  
  });


  router.route('/approval').get(async (req, res) => {
  
      res.render('approval');
  
  });


  router.route('/admin').get(async (req, res) => {
    //code here for GET
  
    const unapprovedUsers = await getUnapprovedUsers();
    console.log(unapprovedUsers);
        res.render('admin', { users: unapprovedUsers });
  
    //res.render('admin',{firstName: firstName, lastName: lastName, currentTime: currentTime});
    
  });

  router.route('/editprofile').get(async (req, res) => {
    //code here for GET

    res.render('editprofile');
    
  }).post(async (req, res) => {
    const firstNameInput = req.body.firstNameInput;
    const lastNameInput = req.body.lastNameInput;
    const userNameInput = req.body.usernameInput;
  
      try{
        const editStatus = await updateProfile(req.session.user.userId,firstNameInput,lastNameInput,userNameInput);
        res.render('messages', { generalMessage: "Successfully changed!" })
          
      }
      catch (error) {
        console.log(error.message);
        res.render('error', { errorMessage: error.message });
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
  
  export default router;