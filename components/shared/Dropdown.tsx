import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useState } from "react";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input";

  

interface dropDownProps {
    value?: string;
    onChangeHandler?: () => void
}


export default function Dropdown({ value, onChangeHandler}: dropDownProps){
  //this useState lets us create categories dynamically
  //ICategory can be seen in the lib folder
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCatergory, setNewCategories] = useState('')

  function handleAddCategory(){
    //this required an actions file to be created
    
  }

  return(
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((catergory) => (
          <SelectItem key={catergory._id} value={catergory._id} className="select-item p-regular-14">
            {catergory.name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Open</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Catergory</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Catergory name" className="mt-3 input-field" onChange={(e) => setNewCategories(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SelectContent>
    </Select>

  )
}