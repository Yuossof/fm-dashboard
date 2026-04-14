import { Card, CardContent } from "@/components/ui/card"
import { FileDropzoneSingle } from "../../file-dropzone-single"
import type { FileType } from "@/types"

interface BasicFileDropzoneProps {
  onFileChange?: (file: File | null) => void
}

export function BasicFileDropzone({ onFileChange }: BasicFileDropzoneProps) {
  return (
    <Card className="mt-1 mb-1">
      <CardContent className="pt-6">
        <FileDropzoneSingle onFileChange={onFileChange} />
      </CardContent>
    </Card>
  )
}