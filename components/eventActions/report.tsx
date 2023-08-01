"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";
import {EventOperationsProps} from "@/components/event-operations";
import {redirect} from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Overview} from "@/components/chart";
import {Visit} from "@/components/chart2";
import {DataTable} from "@/components/table/components/data-table";
import {columns} from "@/components/table/components/column";
import {EmptyPlaceholder} from "@/components/empty-placeholder";
import {EventLinkButton} from "@/components/event-link-button";


export async function ReportAction({event}: EventOperationsProps){
  const response = await fetch(`/api/events/report?eventId=${event.id}`)
  const resposta = await response.json();
  console.log(resposta)
  const total = resposta.total;
  console.log(total)
  const totalConfirmed: number = resposta.totalConfirmed;
  const totalDeclined: number = resposta.totalDeclined;
  const totalUnconfirmed: number = resposta.totalUnconfirmed;
  const data: {id: string, name: string, status: string, message: string, created_at: string}[] = resposta.dataTable;
  const dataChart: {name: string, total: number}[] = resposta.dataChart;
  const dataChartVisit: {name: string, total: number}[] = resposta.dataChartVisit;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TooltipContent>Ver Relatório</TooltipContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Icons.report className="h-4 w-4"></Icons.report>
                </Button>
              </DialogTrigger>
              <DialogContent className={"max-h-[800px] sm:max-w-[1200px] overflow-y-scroll"}>
                <DialogHeader>
                  <DialogTitle>Relatório {event.title}</DialogTitle>
                  <DialogDescription>Aqui estão os dados e métricas do seu evento.</DialogDescription>
                </DialogHeader>
                  {total > 0 ? (
                          <div className=" grid grid-cols-1">
                              <div className="grid grid-col-2 gap-3 lg:grid-cols-4">
                                  <Card className="h-[100px] border-t-purple-300 border-t-4 ring-gray-200 shadow ring-1 ">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                          <CardTitle className="text-md font-medium">
                                              Total
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex flex-row">
                                          <Icons.checkCircle className="h-8 w-8 p-1  mr-3 bg-purple-300 text-purple-800 rounded-lg"/>
                                          <div className="text-2xl font-bold">{total}</div>
                                      </CardContent>
                                  </Card>
                                  <Card className="h-[100px] border-t-emerald-300 border-t-4 ring-gray-200 shadow ring-1 ">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                          <CardTitle className="text-md font-medium">
                                              Confirmados
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex flex-row">
                                          <Icons.checkCircle className="h-8 w-8 p-1  mr-3 bg-emerald-300 text-green-800 rounded-lg"/>
                                          <div className="text-2xl font-bold">{totalConfirmed}</div>
                                      </CardContent>
                                  </Card>
                                  <Card className="h-[100px] border-t-amber-400 border-t-4">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                          <CardTitle className="text-md font-medium">
                                              Indefinidos
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex flex-row">
                                          <Icons.help className="bg-amber-400 text-yellow-800 h-8 w-8 p-1  mr-3 rounded-lg"/>
                                          <div className="text-2xl font-bold">{totalUnconfirmed}</div>
                                      </CardContent>
                                  </Card>
                                  <Card className="h-[100px]  border-t-red-400 border-t-4">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                          <CardTitle className="text-md font-medium">Recusados</CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex flex-row">
                                          <Icons.xCircle className="bg-red-400 text-red-800 h-8 w-8 p-1 rounded-lg mr-3 "/>
                                          <div className="text-2xl font-bold">{totalDeclined}</div>
                                      </CardContent>
                                  </Card>
                              </div>
                              <div className={"max-w-[1130px] grid sm:grid-cols-2 mb-5 mt-5 gap-2"}>
                                <Card className="w-full">
                                  <CardHeader>
                                    <CardTitle>Registros</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Overview event={dataChart}/>
                                  </CardContent>
                                </Card>
                                <Card className="w-full">
                                  <CardHeader>
                                    <CardTitle>Visitas</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Visit event={dataChartVisit}/>
                                  </CardContent>
                                </Card>
                              </div>
                            <DataTable columns={columns} data={data}/>
                          </div>
                  ) : (
                      <EmptyPlaceholder>
                          <EmptyPlaceholder.Icon name="userx"/>
                          <EmptyPlaceholder.Title>Nenhum Convidado.</EmptyPlaceholder.Title>
                          <EmptyPlaceholder.Description>
                              Você ainda não tem convidados. Comece enviando o convite para seus convidados.
                          </EmptyPlaceholder.Description>
                          <EventLinkButton link={event.id}/>
                      </EmptyPlaceholder>
                  )}
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
