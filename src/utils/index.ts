import { FormControlItem, MenuItem, Option } from "./types";

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "category",
    label: "Category",
    path: "/category/application",
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/blogs",
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
  },
];

export const categories: Option[] = [
  {
    value: "application",
    label: "Application",
  },
  {
    value: "data",
    label: "Data",
  },
  {
    value: "software",
    label: "Software",
  },
  {
    value: "tech",
    label: "Technology",
  },
  {
    value: "science",
    label: "Science",
  },
];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter Blog Title",
    type: "text",
    component: "input",
    options: [],
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Enter Blog Description",
    type: "text",
    component: "textarea",
    options: [],
  },
  {
    id: "category",
    label: "Category",
    placeholder: "Choose Blog Category",
    type: "",
    component: "select",
    options: categories,
  },
];


export const firebaseConfig = {
  apiKey: "AIzaSyDJ0SRRwjY4p3glhn8R7ZY-ngtlnvUZLRk",
  authDomain: "blogapp-403116.firebaseapp.com",
  projectId: "blogapp-403116",
  storageBucket: "blogapp-403116.appspot.com",
  messagingSenderId: "29902001336",
  appId: "1:29902001336:web:1acc39dcd5ca606814504d",
};

export const initialBlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
};
