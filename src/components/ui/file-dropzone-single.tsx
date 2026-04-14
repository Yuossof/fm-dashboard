"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { Loader2, UploadCloud, X } from "lucide-react"

import type { FileType } from "@/types"
import type { DropzoneOptions } from "react-dropzone"

import { cn, formatFileSize, wait } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { FileThumbnail } from "./file-thumbnail"

export interface FileDropzoneProps extends Omit<Partial<DropzoneOptions>, "multiple" | "maxFiles"> {
    className?: string
    value?: File | null
    onFileChange?: (file: File | null) => void
}

export function FileDropzoneSingle({
    className,
    value,
    onFileChange,
    ...props
}: FileDropzoneProps) {
    const [file, setFile] = useState<File | null>(value || null)
    const [isLoading, setIsLoading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const picked = acceptedFiles[0]
            if (!picked) return

            setFile(picked)
            onFileChange?.(picked)

            setIsLoading(true)
            await wait(1000)
            setIsLoading(false)
        },
        [onFileChange]
    )
    useEffect(() => {
        setFile(value || null)
    }, [value])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        maxFiles: 1,
        disabled: !!file,
        ...props,
    })

    const removeFile = () => {
        setFile(null)
        onFileChange?.(null)
    }
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null)
            return
        }

        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [file])
    return (
        <div
            data-slot="file-dropzone"
            {...getRootProps()}
            className={cn(
                "h-52 w-full relative flex rounded-lg border border-dashed border-muted-foreground cursor-pointer transition-colors hover:border-primary hover:bg-muted/50",
                isDragActive && "border-primary bg-muted/50",
                file && "cursor-default hover:border-muted-foreground hover:bg-transparent",
                className
            )}
        >
            <input {...getInputProps()} />

            {file ? (
                <div className="flex flex-1 items-center gap-4 p-4">
                    {/* Preview */}
                    <div className="shrink-0 h-full aspect-square rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                        {file?.type.startsWith("image/") && previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt={file.name}
                                width={160}
                                height={160}
                                className="h-full w-full object-contain pointer-events-none"
                            />
                        ) : (
                            <FileThumbnail fileName={file?.name || ""} />
                        )}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground font-semibold">
                            {formatFileSize(file.size)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{file.type || "Unknown type"}</p>
                    </div>

                    {/* Remove button */}
                    <Button
                        variant="secondary"
                        size="icon"
                        className="shrink-0 h-7 w-7"
                        onClick={(e) => {
                            e.stopPropagation()
                            removeFile()
                        }}
                        aria-label="Remove file"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center gap-2 text-center p-4">
                    <UploadCloud className="h-7 w-7 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        Drag & drop a file here, or click to select
                    </p>
                </div>
            )}
        </div>
    )
}