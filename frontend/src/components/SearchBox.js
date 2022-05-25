import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }


  return (
    <Form style={{display:"flex"}} onSubmit={submitHandler}>
        <Form.Control type="text" name='q' placeholder="Search Product" value={keyword} className='mr-sm-2 ml-sm-5' onChange={(e) => setKeyword(e.target.value)}>
        </Form.Control>
        <Button variant="outline-success" type="submit" className='p-2 mx-1'>Search</Button>
    </Form>
  )
}

export default SearchBox