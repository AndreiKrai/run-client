/**
 * User model type with all fields
 */
export type User = {
  id: number;
  email: string;
  password: string;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  emailVerificationToken: string | null;
  emailVerified: boolean;
  googleId: string | null;
  facebookId: string | null;
  appleId: string | null;
  githubId: string | null;
  provider: string | null;
  lastLogin: Date | null;
  // role: UserRole;
  role: any;
  createdAt: Date;
  updatedAt: Date;

  // Relations (optional for flexibility)
  //profile?: Profile | null;
  profile?: any | null;
  //tokens?: Token[];
  tokens?: any[];
  //addresses?: Address[];
  addresses?: any[];
};
