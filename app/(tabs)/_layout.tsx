import { Redirect, Slot } from 'expo-router';

export default function Layout()  {
  const isAuthenticated = true;

  if(!isAuthenticated) return <Redirect href='/(auth)/sign-up' />


  return <Slot />

  }