'use client'

import {Button, Callout, Text, TextField} from "@radix-ui/themes";
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


type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {

  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const router = useRouter();
  const submitFunction = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data)
      router.push("/issues")
    }
    catch (error) {
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
      <form className="space-y-3  flex-col"
            onSubmit={submitFunction}
      >
        <TextField.Root placeholder="Title" {...register('title')}/>
        {errors.title && <Text as="p" color="red">{errors.title.message}</Text>}
        <Controller render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
                    control={control}
                    name="description"
        />
        {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}
        <Button>Create Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage;