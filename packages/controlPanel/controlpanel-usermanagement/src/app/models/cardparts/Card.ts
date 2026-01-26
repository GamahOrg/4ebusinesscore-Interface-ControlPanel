import { ReactNode } from "react";

export interface Card {
    id: string;
    parentNoteNameAr: string;
    parentNoteNameEn: string;
    noteNameAr: string;
    noteNameEn: string;
    description: string;
    icon: ReactNode; // ReactNode can be used for JSX elements
    url: string;
    color: number;
    state: number;
    isActive: boolean;
    visitDate: string;
    lastUpdate: string;
    noteTypeId: string;
    organizationHierarchyId: string;
    orgNameAr: string;
    orgNameEn: string;
    lkNoteTypes: {
      id: string;
      nameAr: string;
      nameEn: string;
    };
  }