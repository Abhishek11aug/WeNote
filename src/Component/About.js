import React from "react";
const propTypes = {};
const defaultProps = {};

const About = () => {
  return (
    <div className="container">
      <div className="text-center"><img className='logo' src='logo.jpg' alt='N'></img></div>
      <p>
        I-NoteBook is a note-taking application that offers users
        the ability to store, access, and manage their notes from any location
        with an internet connection. It provides a secure and convenient
        solution for users to organize their thoughts, ideas, and important
        information in one centralized location.
      </p>
      
      <p className="fs-6">
        User Authentication:The app ensures proper authentication, requiring
        users to create an account and log in securely to access their notes.
        This helps protect their sensitive information and ensures that only
        authorized users can view and modify their notes.
      </p>

      <p className="fs-6">
        Note Creation and Editing: Users can easily create new notes, allowing
        them to jot down thoughts, ideas, reminders, or any other information
        they want to store. They can also edit existing notes, making it
        convenient to update and modify their content as needed.
      </p>
      <p className="fs-6">
        Note Organization: The app provides features to help users organize
        their notes effectively. This may include the ability to categorize
        notes into different folders or using tags and labels to easily search
        and filter notes based on specific criteria.
      </p>

      <p className="fs-6">
        Note Viewing and Search: Users can view their notes in a user-friendly
        interface that presents the content in a readable and organized manner.
        Additionally, the app may offer search functionality, allowing users to
        quickly find specific notes by keywords or other criteria.
      </p>

      <p className="fs-6">
        Note Deletion: Users have the option to delete notes they no longer
        need. This ensures they can maintain a clutter-free and organized note
        collection, removing any unnecessary information.
      </p>
     
      
      <p className="fs-6">
        Security and Privacy: The app prioritizes the security and privacy of
        user data. It employs encryption and other security measures to protect
        notes from unauthorized access or data breaches. User data is stored
        securely in the cloud, offering peace of mind to users.
      </p>
    </div>
  );
};

About.propTypes = propTypes;
About.defaultProps = defaultProps;
export default About;
