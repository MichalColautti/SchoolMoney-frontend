import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { addToWallet } from '../services/parent'

const LOCAL_STORAGE_USER_KEY = 'USER'

const UserDataContext = createContext(undefined, undefined)

export const UserDataProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    try {
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e) {
      console.error('Błąd parsowania użytkownika z localStorage', e)
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    }
  }, [user])

  const onClearUser = () => {
    setUser(null)
  }

  const onSetUser = (user) => {
    setUser(user)
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, user)
  }

  const onChangeUserData = (data, field) => {
    setUser((prev) => ({
      ...prev,
      [field]: data,
    }))
  }

  const onDeleteFromClass = (classId, childId) => {
    setUser(prev => ({
      ...prev,
      children: prev.children.map((child) => {
        if (child.id !== childId) return child
        else {
          child.className = null
          return child
        }
      }),
      classes: prev.classes.map((c) => ({
        ...c,
        children: c.children.filter((c) => c.id !== childId)
      }))
    }))
  }

  const onAppendToList = (data, field) => {
    const tempData = user[field]

    setUser(prev => ({
      ...prev,
      [field]: [...tempData, data]
    }))
  }

  const onDeleteFromList = (data, field) => {
    const tempData = user[field].filter((item) => item.id !== data.id)

    setUser(prev => ({
      ...prev,
      [field]: tempData
    }))
  }

  const onReplaceItemInList = (data, field) => {
    const tempData = user[field].filter((item) => item.id !== data.id)

    setUser(prev => ({
      ...prev,
      [field]: [...tempData, data]
    }))
  }

  const onEditChildInClass = (name, surname, id) => {
    setUser(prevUser => ({
      ...prevUser,
      classes: prevUser.classes.map(c => ({
        ...c,
        children: c.children.map(child => {
          if (child.id === id) {
            return {
              ...child,
              name: name,
              surname: surname
            }
          }
          return child
        })
      }))
    }))
  }

  const onDeleteChild = (id) => {
    const tempChildren = user['children'].filter((item) => item.id !== id)
    const tempClasses = user['classes'].map(c => ({
      ...c,
      children: c.children.filter(child => child.id !== id)
    })).filter(c => c.children.some(child => child.isMyChild))

    setUser(prev => ({
      ...prev,
      children: tempChildren,
      classes: tempClasses
    }))
  }

  const onChangeChildClass = (className, childId) => {
    setUser(prevUser => ({
      ...prevUser,
      children: prevUser.children.map(child =>
        child.id === childId ? { ...child, className: className } : child
      )
    }))
  }

  const addMoney = (amount, token) => {
    addToWallet(amount, token).then(() => {
      setUser(prev => ({
        ...prev,
        wallet: parseFloat(prev.wallet) + parseFloat(amount)
      }))
    }).catch(console.error)
  }

  const changeUserMoney = (amount) => {
    setUser(prev => ({
      ...prev,
      wallet: parseFloat(prev.wallet) + parseFloat(amount)
    }))
  }

  const value = useMemo(
    () => ({
      user,
      onChangeUserData,
      onAppendToList,
      onReplaceItemInList,
      onDeleteFromList,
      onChangeChildClass,
      setUser,
      onClearUser,
      onSetUser,
      onEditChildInClass,
      onDeleteChild,
      onDeleteFromClass,
      addMoney,
      changeUserMoney
    }),
    [user])

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserData = () => useContext(UserDataContext)