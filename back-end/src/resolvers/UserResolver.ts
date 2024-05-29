import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Field,
  ArgsType,
  Arg,
  ID,
  registerEnumType,
} from "type-graphql";
import User from "../entities/user";
import { UserTypeEnum } from "../utils/userTypeEnum";
import { MinLength, IsEmail } from "class-validator";
import { Context } from "..";
import { setUserSessionIdInCookie } from "../utils/cookie";

registerEnumType(UserTypeEnum, {
  name: "UserTypeEnum",
  description: "The basic user types",
});

@ArgsType()
export class EditOrCreateUser {
  @Field()
  pseudo!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field(() => [String], { nullable: true, defaultValue: "User" })
  roles!: string[];

  @Field()
  @MinLength(10)
  password!: string;
}

@ArgsType()
export class signIn {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args() args: EditOrCreateUser) {
    return User.createNewUser(args);
  }

  @Mutation(() => User)
  updateUser(@Arg("id", () => ID) id: string, @Args() args: EditOrCreateUser) {
    return User.editUserInfo(id, args);
  }

  @Query(() => [String])
  getRoles() {
    console.log("UserTypeEnum in getRoles:", UserTypeEnum);
    return Object.values(UserTypeEnum);
  }

  @Mutation(() => User)
  async signIn(@Args() args: signIn, @Ctx() context: Context): Promise<User> {
    const { user, session } = await User.login(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() context: Context): Promise<Boolean> {
    setUserSessionIdInCookie(context.res, null);
    return true;
  }

  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return user as User;
  }

  @Query(() => User)
  async user(@Arg("id", () => ID) id: string) {
    return await User.getUserById(id);
  }
}
