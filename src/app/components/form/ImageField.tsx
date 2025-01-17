import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Paperclip } from "lucide-react";
import { DropzoneOptions } from "react-dropzone";
import { Control } from "react-hook-form";
import { FormData } from "schemas/formSchema";

interface CustomImageFieldProps {
  formControl: Control<FormData>;
  uploadedFiles: File[] | null;
  handleFileChange: (value: File[] | null) => void;
  dropzoneOptions: DropzoneOptions;
}

const CustomImageField = ({
  formControl,
  uploadedFiles,
  handleFileChange,
  dropzoneOptions,
}: CustomImageFieldProps) => {
  return (
    <FormField
      control={formControl}
      name="imageUrl"
      render={() => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <FileUploader
              value={uploadedFiles}
              onValueChange={handleFileChange}
              dropzoneOptions={dropzoneOptions}
              className="relative p-2 rounded-lg bg-background"
            >
              <FileInput
                id="customFileInput"
                className="outline-dashed outline-1 outline-slate-500"
              >
                <div className="flex flex-col items-center justify-center w-full p-8">
                  <CloudUpload className="w-10 h-10 text-gray-500" />
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent>
                {uploadedFiles &&
                  uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, index) => (
                    <FileUploaderItem key={index} index={index}>
                      <Paperclip className="w-4 h-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomImageField;
