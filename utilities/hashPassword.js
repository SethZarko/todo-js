import bcrypt from 'bcrypt'

export const hashPassword = async function(next) {
    try {
      // Only hash the password if it has been modified (or is new)
      if (!this.isModified('password')) {
        return next();
      }
  
      // Hash the password with a salt round of 10
      const hashedPassword = await bcrypt.hash(this.password, 10);
  
      // Set the hashed password back to the user's password field
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
};