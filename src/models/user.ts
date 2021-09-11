import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
  email: string;
  password: string;

  validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.validatePassword = async function (
  password
): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default model<User>('User', UserSchema);
