'use client'

import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {z} from 'zod'
import {createIssueSchema} from "@/app/validationSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";


type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post("/api/issues", data)
      router.push("/issues")
    }
    catch (error) {
      setIsSubmitting(false)
      setError('An unexpected error occurred!')
      console.log(error)
    }
  })

  return (
    <div className="max-w-xl">
      {
        error && (
          <Callout.Root color="red" role="alert" className="mb-5">
            <Callout.Icon>
              <ExclamationTriangleIcon/>
            </Callout.Icon>
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>
        )
      }
      <form className="space-y-4  flex-col"
            onSubmit={onSubmit}
      >
        <TextField.Root placeholder="Title" {...register('title')} className="text-lg"/>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
                    control={control}
                    name="description"
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Create Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage;