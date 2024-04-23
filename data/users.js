import { users } from "../config//mongoCollections.js";
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';
//import { encodeBase64 } from "bcryptjs";
//fix depracated language here

export const createUser = async (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
  
  if (!firstName || !lastName || !email || !password || !username) {
    throw new Error('All fields must be supplied.');
  }
  
  if (typeof firstName !== 'string' || !/^[a-zA-Z]+$/.test(firstName) || firstName.length < 2 || firstName.length > 25) {
    throw new Error('First name must be a valid string between 2 and 25 characters long with no numbers.');
  }
  
  if (typeof lastName !== 'string' || !/^[a-zA-Z]+$/.test(lastName) || lastName.length < 2 || lastName.length > 25) {
    throw new Error('Last name must be a valid string between 2 and 25 characters long with no numbers.');
  }

  if (typeof username !== 'string' || username.length < 4 || username.length > 25) {
    throw new Error('User name must be a valid string between 4 and 25 characters long.');
  }
  
  if (!/\S+@\S+\.\S+/.test(email.toLowerCase())) {
    throw new Error('Invalid email address format.');
  }
  
  if (password.length < 8 || !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
    throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.');
  }
 
  const usersCollection = await users();
  const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new Error('A user with this email address already exists.');
    }

    const reviews = []
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
  
    await usersCollection.insertOne({
        firstName,
        lastName,
        emailAddress: email.toLowerCase(),
        userName: username,
        password: hashedPassword,
        isAdminApproved: false,
        reviews,
        role:"user"
    });
  
    return { insertedUser: true };
  
  };


export const getAllUsers = async () => {
    const userCollection = await users();
    let userList = await userCollection.find({}).toArray();
    if (!userList) throw new Error ('Could not get all users.');
    userList = userList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return userList;
};


export const getUser = async (id) => {

    if (!id) throw new Error('Please provide an ID to search for.');
    if (typeof id !== 'string') throw new Error('ID must be a string.');
    if (id.trim().length === 0) throw new Error('Please enter a valid ID.');

    id = id.trim();

    //convert id to string before passing it?
    //const ObjectId = new ObjectId(id);

    if (!ObjectId.isValid(id)) throw new Error ('Invalid object ID');

    const usersCollection = await users();
    const _user = await usersCollection.findOne({ _id: new ObjectId.createFromHexString(id) }); //depracated language used here

    if (_user === null) throw new Error ('No user with that ID');

    _user._id = _user._id.toString();
    return _user;
};


export const removeUser = async (userId) => {
    if (!userId) throw new Error("Please provide an ID to remove.");
    if (typeof userId !== 'string') throw new Error ("ID must be a string.");

    trimmedUserId = userId.trim();

    if (trimmedUserId.length === 0) throw new Error("Please provide a valid ID.");
    if (!ObjectId.isValid(trimmedUserId)) throw new Error("Invalid object ID");

    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId.createFromHexString(trimmedUserId)
    });

    if (!deletionInfo.value) throw new Error(`Could not delete user with id of ${userId}`);

    const deletedUser = deletionInfo.value;

    return `${deletedUser.firstName} ${deletedUser.lastName} has been deleted.`;
};

export const updateProfile = async (
    userId,
    firstName,
    lastName,
    userName
) => {

    if (typeof firstName !== 'string' || !/^[a-zA-Z]+$/.test(firstName) || firstName.length < 2 || firstName.length > 25) {
        throw new Error('First name must be a valid string between 2 and 25 characters long with no numbers.');
      }
      
      if (typeof lastName !== 'string' || !/^[a-zA-Z]+$/.test(lastName) || lastName.length < 2 || lastName.length > 25) {
        throw new Error('Last name must be a valid string between 2 and 25 characters long with no numbers.');
      }
    
      if (typeof userName !== 'string' || userName.length < 4 || userName.length > 25) {
        throw new Error('Username name must be a valid string between 4 and 25 characters long.');
      }

      if (!ObjectId.isValid(userId)) throw new Error ('Invalid object ID');

    const oldUser= await getUser(userId);
  
    const updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        emailAddress: oldUser.emailAddress,
        password: oldUser.password,
        isAdminApproved: oldUser.isAdminApproved,
        reviews:oldUser.reviews,
        role:oldUser.role
    };

    const usersCollection = await users();
    const updatedInfo = await usersCollection.findOneAndUpdate(
      {_id: new ObjectId.createFromHexString(userId)},
      {$set: updatedProfile},
      {returnDocument: 'after'}
    );

    if (!updatedInfo) {
      throw new Error('Could not update user successfully');
    }

    const updated = await getUser(userId);

    return updated;
};


export const approveProfile = async (
    userId
) => {

    if (!ObjectId.isValid(userId)) throw 'Invalid object ID';

    const oldUser= await getUser(userId);
  
    const updatedProfile = {
        firstName: oldUser.firstName,
        lastName: oldUser.lastName,
        userName: oldUser.userName,
        emailAddress: oldUser.emailAddress,
        password: oldUser.password,
        isAdminApproved: true,
        reviews:oldUser.reviews,
        role:oldUser.role
    };

    const usersCollection = await users();
    const updatedInfo = await usersCollection.findOneAndUpdate(
      {_id: new ObjectId.createFromHexString(userId)},
      {$set: updatedProfile},
      {returnDocument: 'after'}
    );

    if (!updatedInfo) {
      throw 'Could not approve user successfully.';
    }

    const updated = await getUser(userId);

    return updated;
};


export const loginUser = async (emailAddress, password) => {

    if (!emailAddress || !password) {
      throw new Error('Both email address and password must be supplied.');
  }
  
  if (!/\S+@\S+\.\S+/.test(emailAddress.toLowerCase())) {
      throw new Error('Invalid email address format.');
  }
  
  const usersCollection = await users();
      const user = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() });
      if (!user) {
          throw new Error('Either the email address or password is invalid.');
      }
  
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          throw new Error('Either the email address or password is invalid.');
      }
      
      console.log("User data -> "+user.isAdminApproved);
      const userData = {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          userName: user.userName,
          isAdminApproved: user.isAdminApproved,
          reviews:user.reviews,
          role:user.role
      };
  
      return userData;
  };
  

  export const getUnapprovedUsers = async () => {

    const allUsers = await getAllUsers();
     // Replace with your actual function to get all users
        
        // Filter users where isAdminApproved is false
        const unapprovedUsers = allUsers.filter(user => !user.isAdminApproved && user.role!="admin");

        return unapprovedUsers;
  
  };


