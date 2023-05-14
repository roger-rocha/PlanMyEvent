"use client"

import {Row} from "@tanstack/react-table"

import {Button} from "@/components/ui/button"
import {taskSchema} from "../data/schema"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Icons} from "@/components/icons";
import * as React from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
                                             row,
                                           }: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"> <Icons.eye
          className="w-4 h-4 mr-2"></Icons.eye> Visualizar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mensagem de {task.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {task.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Fechar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
