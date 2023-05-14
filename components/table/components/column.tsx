"use client"

import {ColumnDef} from "@tanstack/react-table"

import {Badge} from "@/components/ui/badge"

import {statuses} from "../data/data"
import {Task} from "../data/schema"
import {DataTableColumnHeader} from "./data-table-column-header"
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
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {

    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <Badge variant="outline" className={status.bgColor}>{status.icon && (
            <status.icon className="mr-2 h-4 w-4  text-muted-foreground" />
          )}
          <span>{status.label}</span></Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {

    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registrado" canSort={false} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[130px] items-center">
          <span>{row.getValue('created_at')}</span>
        </div>
      )
    }
  },
  {

    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensagem" canSort={false}/>
    ),
    cell: ({ row }) => {

      return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"> <Icons.eye
                className="w-4 h-4 mr-2"></Icons.eye>Visualizar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mensagem de {row.getValue('name')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {row.getValue('message')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Fechar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      )
    },
  },
]
