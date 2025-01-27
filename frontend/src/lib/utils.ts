import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadFile = (filePath: string): void => {
  //const url = URL.createObjectURL(fileObj.file);
  //const link = document.createElement('a');
  //link.href = url;
  //link.download = fileObj.file.name;
  //document.body.appendChild(link);
  //link.click();
  //document.body.removeChild(link);
  //URL.revokeObjectURL(url);
};


