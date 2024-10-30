import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Fund {
  id: string;
  name: string;
  description: string;
}

export interface Investment {
  id?: string;
  userId: string;
  fundId: string;
  fundName?: string;
  investmentDate: Date;
  initialInvestmentValue: number;
  currentInvestmentValue?: number;
}
