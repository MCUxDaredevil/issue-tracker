'use client'

import React from 'react'
import {Button, TextArea, TextField} from "@radix-ui/themes";
import {Submit} from "@radix-ui/react-form";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3 items-center justify-self-center flex-col">
      <TextField.Root placeholder="Title"/>
      <TextArea placeholder="Description"/>
      <Button>Create Issue</Button>
    </div>
  )
}

export default NewIssuePage;