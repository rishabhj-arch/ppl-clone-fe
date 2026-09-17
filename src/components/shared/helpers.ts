import clsx from "clsx";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
export const AUTH_TOKEN: string = "AUTH_TOKEN";

export const cn = (
  ...input: (string | false | null | undefined)[]
): string | undefined => {
  return twMerge(clsx(...input));
};

export const EDIT = "EDIT";
export const DELETE = "DELETE";

export const columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
];

export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const OurServices = [
  {
    id: 1,
    title: "Family Law",
    description: `Strategic advice relating to your family law matter
    Divorce
    Property settlements
    Spouse maintenance
    Child support
    Parenting arrangements
    Collaborative law & mediation
    Seeking second opinions
    Advising third parties to Family Law matters
    Attending hearings in Family Law matters
    Witness preparation for hearings and interviews by experts
    Use of other experts when required, including forensic accountants, medico-legal experts, shadow experts, private investigators, and criminal defence lawyers`,
  },
  {
    id: 2,
    title: "Private Advisory",
    description: `Binding Financial Agreements (BFAs)
    Enduring Power of Attorney (EPOA)
    Enduring guardian / end of life care and decision making
    Advance health directive
    Estate advice and planning for simple and complex estates
    Will preparation including testamentary trust wills
    Trusts advice and trust deed preparation
    Asset protection and claims prevention
    Establishing self-managed superannuation funds (SMSFs)`,
  },
  {
    id: 3,
    title: "Wills and Estate Lawyers",
    description: `Apply for probate and letters of administration
    Family Provision Claims
    Contested wills and estate litigation
    Mediation of disputes`,
  },
];
