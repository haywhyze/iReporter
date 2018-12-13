const validateUserInput = (req, res, next) => {
    const { fullname } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;
    const { username } = req.body;
    const { phoneNumber } = req.body;
    const error = [];
  
    const validPhone = /^[+]?(\d{0,3})(\d{11})$/;
    if (!validPhone.test(phoneNumber)) {
      error.push('Phone Number is invalid');
    }
  
    const validUserName = /^[_a-z0-9]{3,15}$/;
    if (!validUserName.test(username)) {
      error.push('Username is not valid. Pls provide lowercase letters, numbers and _ between 3 and 15 chars.');
    }
  
    if (password !== confirmPassword) {
      error.push('Passwords do not match.');
    }
  
    if (password.length < 8 || password.length > 32) {
      error.push('Password too short or too long. Pls provide pass word between 8 and 32 chars.');
    }
  
    const validName = /^[a-zA-Z][ \-a-zA-Z]{0,50}$/;
    if (!validName.test(fullname)) {
      error.push('Fullname provided is not valid. Only lowercase/uppercase letters are allowed.');
    }
  
    const validEmail = /^[\w\d.\-_]+@[\w\d.\-_]+\.[\w]+$/;
    if (!validEmail.test(email)) {
      error.push('Email provided is not valid.');
    }
  
    if (error[0]) {
      return res.status(400)
        .send({
          status: 400,
          error,
        });
    }
    return next();
  };
  
  export default validateUserInput;