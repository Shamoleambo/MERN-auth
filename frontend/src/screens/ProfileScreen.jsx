import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [updateProfile, { isLoading }] = useUpdateUserMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          passwordConfirmation
        })
        dispatch(setCredentials({ ...res }))

        toast.success('Profile updated')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='Enter new name'
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter new email'
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter new password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='passwordConfirmation' className='my-2'>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type='password'
            value={passwordConfirmation}
            placeholder='Confirm your new password'
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader />}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen
