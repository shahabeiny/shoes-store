import React from 'react'
import "./Loading.css"

const Loading = () => {
  return (
    <div className='loading__wrapper'>
      <span custom-attribute="--i:1">.</span>
      <span custom-attribute="--i:2">.</span>
      <span custom-attribute="--i:3">.</span>
      <span custom-attribute="--i:4">g</span>
      <span custom-attribute="--i:5">n</span>
      <span custom-attribute="--i:6">i</span>
      <span custom-attribute="--i:7">d</span>
      <span custom-attribute="--i:8">a</span>
      <span custom-attribute="--i:9">o</span>
      <span custom-attribute="--i:10">L</span>
    </div>
  )
}

export default React.memo(Loading);