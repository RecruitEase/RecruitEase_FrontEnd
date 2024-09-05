/* eslint-disable no-unused-vars */
import {UseFormRegister} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {SVGProps} from "react";
import { ApplicationProp } from "./applications";
import { RecruiterProp } from "./users";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


declare interface UploadFileProps{
  file:File;
  path:string
}



declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface ReactQuillReadOnlyProps {
  content?: string;
}

declare interface CoverLetterProps {
  application: ApplicationProp;
  recruiter:RecruiterProp;
  job:JobProps
}


declare interface IconProps  {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}


declare interface TotalVacacyProps {
  activeVacancies:number,
  filledVacancies:number
}


declare interface AnimatedCounterProps {
  end:number,
  prefix?:string,
  duration?:number,
  start?:number
}

declare interface DoughnutChartProps {
  active:number,
  filled:number,
}

declare type User = {
     id:string,
     email:string,
     role:string,
     roleDetails:RoleDetails,
     createdAt:string,
    isActive:boolean,
     accessToken:string,
     refreshToken:string
};
declare type RoleDetails = {
  firstName:string,
  lastName:string,
  address:string,
  mobileNumber:string,
  profilePic:boolean,
  adminId?:string,
  moderatorId?:string,
  candidateId?:string,
  profileStatus?:string,
  nic?:string,
  dob?:string,
  recruiterId?:string,
  companyName?:string,
  website?:string,
  businessRegistrationNumber?:string,
};


declare interface SideBarProps {
  user: User;
}




declare interface CustomFormInputProps{
  register:UseFormRegister<TFieldValues>,
  name:string,
  type?:string,
  label:string,
  required:boolean,
  errors:FieldErrors<TFieldValues>,
  validationSchema:object,
  placeholder?:string,
  variant?:string,
  className?:string
}



declare interface CustomFormInputWithoutValidationProps{
  name:string,
  type?:string,
  label:string,
  required:boolean,
  placeholder?:string,
  variant?:string,
  className?:string
}

declare interface JobProps {
  jobId:string,
  logo: string;
  title: string;
  company: string;
  location: string;
  type: string;
  daysLeft: string;
}

declare interface FieldProps {
  key: number;
  id:string,
  label: string;
  nJobs: number;
 
}


declare interface CVProps{
  cvId: string,
  cvName: string,
  file: string,
  modifiedDate: string,
  type: string
}




//for chat.......................



interface LastMessage {
  content: string;
  timestamp: string;
}

interface SenderProp {
  img: string;
  name: string;
  lastMsg: LastMessage;
  unreadCount: number;
  isOnline:boolean;
}

interface MsgProp {
  content:string;
  img?:string;
  timestamp:string;
}


interface ChatMsgProp {
  sender:SenderProp;
  msg:MsgProp;

  isSenderLoggedUser?:boolean;
}






















//examples........
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};



declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharableId: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}



declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotlaBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface FooterProps {
  user: User;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}


declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryProps {
  category: CategoryCount;
}


declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface getTransactionsByBankIdProps {
  bankId: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  sharableId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}
