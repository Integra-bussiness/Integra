import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma, withPrismaRetry } from "@/utils/prisma";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

const ITEMS_LIMIT = 50;

const sectionStyle: React.CSSProperties = {
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    padding: "20px 25px",
    marginBottom: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
};
const headingStyle: React.CSSProperties = {
    color: "#222222",
    borderBottom: "2px solid #ccc",
    paddingBottom: "6px",
    marginBottom: "18px",
    fontWeight: 600,
    fontSize: "1.3rem",
};
const mainStyle: React.CSSProperties = {
    maxWidth: "1100px",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#111111",
    lineHeight: 1.5,
};


function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
                <h2 className="font-bold text-xl mb-2">Ошибка загрузки данных</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/");


    const finances = await prisma.finances.findMany()
    // const kpis = await prisma.kpis.findMany()
    // const orderItems = await prisma.order_items.findMany()
    // const orders = await prisma.orders.findMany()

    return (
        <main style={mainStyle}>
            <h1
                style={{
                    ...headingStyle,
                    fontSize: "2rem",
                    marginBottom: "10px",
                    textAlign: "center",
                    borderBottom: "none",
                }}
            >
                Dashboard Data
            </h1>
            <div style={{ textAlign: "center", marginBottom: "30px", fontSize: "1.1rem" }}>
                Привет, {user.email}
            </div>


            {/* Финансы */}
            <section style={sectionStyle}>
                <h2 style={headingStyle}>Финансы</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Дата</TableHead>
                                <TableHead>Тип</TableHead>
                                <TableHead>Сумма</TableHead>
                                <TableHead>Категория</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {finances.map((f) => (
                                <TableRow key={f.id} className="hover:bg-gray-100">
                                    <TableCell>{f.transaction_date?.toLocaleDateString?.() ?? String(f.transaction_date)}</TableCell>
                                    <TableCell>{f.type}</TableCell>
                                    <TableCell>{f.amount?.toString() ?? "0"}</TableCell>
                                    <TableCell>{f.category ?? "нет категории"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

        </main>
    );
}
