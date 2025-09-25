# 🎓 Student Management App

A simple **Student Management System** built with **React**, **React Query**, and **Axios**.  
You can **add**, **edit**, and **delete** students. This project is mainly for learning **React Query** features like `useQuery`, `useMutation`, `prefetchQuery`, and `staleTime`. Toast notifications are used to show success/error messages.

---

## 🚀 Features

- ✅ View a list of students with pagination  
- ✅ Add a new student  
- ✅ Edit an existing student  
- ✅ Delete a student  
- ✅ Prefetch student data before editing for faster loading  
- ✅ Manage API caching and freshness with `staleTime`  
- ✅ Show notifications using **react-toastify**  

---

## 🛠️ Technologies Used

- **React 18**  
- **React Query v5**  
- **Axios** for API calls  
- **React Router v6** for navigation  
- **React Toastify** for notifications  
- **Styled Components** for styling  
- **Backend**: Pre-built server with student data  

---

## ⚡ React Query Usage

- **Fetching data**:

```ts
const { data, isLoading } = useQuery({
  queryKey: ['students', page],
  queryFn: () => getStudents(page, limit),
  staleTime: 5000
})
