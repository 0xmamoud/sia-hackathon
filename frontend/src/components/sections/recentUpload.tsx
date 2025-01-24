import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Upload } from 'lucide-react'

export function RecentUpload() {
  return (
    <section>
      <h2 className="font-lora font-medium text-2xl max-md:text-xl leading-snug text-center mb-4"
      >
        List of your recent documents created
      </h2>
      <Table className='bg-light container w-fit rounded-md shadow-md'>
        <TableCaption>
          List of your recent documents created
        </TableCaption>
        <TableHeader >
          <TableRow>
            <TableHead className="w-[100px]">Files</TableHead>
            <TableHead >Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>{file.date}</TableCell>
              <TableCell className='flex gap-3 items-center justify-center'>
                <Eye
                  className='text-primary cursor-pointer hover:shadow-md hover:bg-background rounded-sm'
                  size={20}
                />
                <Upload
                  className='text-primary cursor-pointer hover:shadow-md hover:bg-background rounded-sm'
                  size={20}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

const files = [
  {
    name: "file1.pdf",
    date: "2021-10-01",
  },
  {
    name: "file2.pdf",
    date: "2021-10-02",
  },
  {
    name: "file3.pdf",
    date: "2021-10-03",
  },
  {
    name: "file4.pdf",
    date: "2021-10-04",
  },
  {
    name: "file1.pdf",
    date: "2021-10-01",
  },
  {
    name: "file2.pdf",
    date: "2021-10-02",
  },
  {
    name: "file3.pdf",
    date: "2021-10-03",
  },
  {
    name: "file4.pdf",
    date: "2021-10-04",
  },
]


