export interface StyleManagerSector {
     name: string;
     open: boolean;
     buildProps?: string[];
     properties: Array<{
       property: string;
       name?: string;
       type?: string;
       default?: string;
       units?: string[];
       list?: Array<{ value: string; name: string; className?: string }>;
       properties?: Array<{ name: string; property: string; type?: string; default?: string; units?: string[] }>;
     }>;
   }