import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EditOrCreateUser, signIn } from "../resolvers/UserResolver";
import { compare, hash } from "bcrypt";
import UserSession from "./userSession";
import { Quiz } from "./quiz";

@Entity("user")
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  pseudo!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column("simple-array", { nullable: true, default: "User" })
  @Field(() => [String], { nullable: true, defaultValue: "User" })
  roles!: string[];

  @Column()
  @Field()
  hashedPassword!: string;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  @Field(() => [Quiz])
  quizz!: Quiz[];

  constructor(user?: EditOrCreateUser) {
    super();
    if (user) {
      this.email = user.email;
      this.pseudo = user.pseudo;
      this.hashedPassword = user.password;
    }
  }

  static async getUsers(): Promise<User[]> {
    return await User.find();
  }

  static async createNewUser(userInfo: EditOrCreateUser): Promise<User> {
    userInfo.password = await hash(userInfo.password, 10);
    const newUser = new User(userInfo);
    return await newUser.save();
  }

  static async editUserInfo(
    id: string,
    userInfo: EditOrCreateUser
  ): Promise<User> {
    const userToUpdate = await User.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error("User does not exist");
    }
    await User.update(id, userInfo);
    await userToUpdate?.reload();
    return userToUpdate;
  }

  static async getUser({ email, password }: signIn): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const isMatch = await compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }
    return user;
  }

  static async login({
    email,
    password,
  }: signIn): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUser({ email, password });
    const session = await UserSession.saveNewSession(user);
    return { user, session };
  }

  static async getUserWithSessionId(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async getUserById(id: string): Promise<User> {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new Error("User does not exist");
    }
    return user;
  }
}

export default User;
