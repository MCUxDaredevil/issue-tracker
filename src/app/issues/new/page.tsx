'use client'

import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";


interface IssueForm {
  title: string,
  description: string
}


const NewIssuePage = () => {

  const [error, setError] = useState("")

  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  const submitFunction = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
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
      <form className="space-y-3 items-center justify-self-center flex-col"
            onSubmit={submitFunction}
      >
        <TextField.Root placeholder="Title" {...register('title')}/>
        <Controller render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
                    control={control}
                    name="description"
        />
        <Button>Create Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage;