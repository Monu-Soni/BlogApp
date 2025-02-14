import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import React from 'react'


export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='flex flex-col justify-center mb-4'>
      {label && <label className='mb-1 pl-1'>{label}</label>}
      <Controller name={name || "content"} control={control}
        render={({ field: { onChange } }) => (
          <Editor apiKey='dvyops3d0d16ez9cyugnkbinxabhseengewr6c1zniz87r8x' initialValue={defaultValue}
            init={{
              initialValue: defaultValue, height: 350, menubar: true,
              plugins: ["image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor"],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          /> 
        )}
      />
    </div>
  )
}
