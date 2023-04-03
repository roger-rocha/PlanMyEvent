import {
  Button,
  Card,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

const colors: { [key: string]: string } = {
  "Recusado": "bg-rose-400",
  "Confirmado": "bg-green-400",
  "Incerto": "bg-yellow-400",
};

const transactions = [
  {
    transactionID: "#123456",
    user: "Rodrigo",
    status: "Recusado",
    link: "#",
  },
  {
    transactionID: "#234567",
    user: "Ronaldo",
    status: "Confirmado",
    link: "#",
  },
  {
    transactionID: "#345678",
    user: "Rogerio",
    status: "Incerto",
    link: "#",
  },
];

export default function ExampleTable() {
  return (
    <Card color="gray">
      <Flex justifyContent="start" className="space-x-2">
        <Title>Convidados</Title>
        {/*<Badge color="gray">8</Badge>*/}
      </Flex>
      <Text className="mt-2">Total de convidados que responderam ao convite do seu evento</Text>

      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Convidado ID</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Mensagem</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.transactionID}>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>
                <span className={` ${colors[item.status]} text-white p-2 rounded`}>{item.status}</span>
              </TableCell>
              <TableCell>
                <Button size="xs" variant="secondary" color="gray">
                  Abrir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
