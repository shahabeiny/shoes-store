import React from 'react'
import "./TitleInput.css"

type TitleInputProps = {
  title :String,
  className?:string
}

const TitleInput = ({title,className}:TitleInputProps)=> {
  return (
    <span className={`title-input ${className?className:''}`}>{title}</span>
  )
}

export default React.memo(TitleInput);
