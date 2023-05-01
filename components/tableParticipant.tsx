import {formatDate} from "@/components/event-item";
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
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface ParticipantTableProps {
  eventParticipant: any[]
}

const colors: { [key: string]: string } = {
  "CONFIRMED": "bg-green-300 text-green-600 p-2 rounded-full",
  "UNCONFIRMED": "bg-yellow-300 text-yellow-600 p-2 rounded-full",
  "DECLINED": "bg-red-300 text-red-600 p-2 rounded-full",
};

const status: { [key: string]: string } = {
  "CONFIRMED": "Confirmado",
  "UNCONFIRMED": "Indeciso",
  "DECLINED": "Recusado",
}


export function TableParticipant({eventParticipant}: ParticipantTableProps) {
  return (

    <Card className="w-[750px] h-[780px]">
      <CardHeader>
        <CardTitle className="flex flex-row"><Icons.users className="w-5 h-5 mr-1"></Icons.users>Lista de
          Convidados</CardTitle>
        <CardDescription>Todos os convidados que responderam ao convite.</CardDescription>
      </CardHeader>
      <CardContent className="w-full max-h-[650px]">
        <div className="bg-transparent max-h-full dark:bg-gray-800 relative sm:rounded-lg overflow-hidden">
          <div
            className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <Input id="search"
                     placeholder={"Pesquisar"}
                     className="w-[400px]"
                     size={32}></Input>
            </div>
            <div
              className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"CONFIRMED"}>Confirmado</SelectItem>
                      <SelectItem value={"UNCONFIRMED"}>Indeciso</SelectItem>
                      <SelectItem value={"DECLINED"}>Recusado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[530px] ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                className="text-xs text-gray-700 rounded-md uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">Nome</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Registro em</th>
                <th scope="col" className="px-4 py-3">Mensagem</th>
              </tr>
              </thead>
              <tbody className="max-h-[500px] overflow-y-auto">
              {eventParticipant.map((item) => (
                <>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                    <td className="px-4 py-3"><span className={colors[item.status]}>{status[item.status]}</span></td>
                    <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline"> <Icons.eye
                            className="w-4 h-4 mr-2"></Icons.eye> Visualizar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Mensagem de {item.name}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {item.message}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction>Fechar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                </>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav
          className="flex mt-5 flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">1-10{" "}</span>
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <a href="#"
                 className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
              <a href="#" aria-current="page"
                 className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
