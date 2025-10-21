import React from "react";
import { PrismaClient } from "@/generated/prisma";
import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
const ITEMS_LIMIT = 100;

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

async function fetchDashboardData() {
    const [
        companies,
        activityLogs,
        clients,
        finances,
        kpis,
        orderItems,
        orders,
        products,
        reports,
        settings,
        users,
    ] = await Promise.all([
        prisma.company.findMany({
            take: ITEMS_LIMIT,
            include: { users: { select: { id: true } } },
        }),
        prisma.activity_logs.findMany({
            take: ITEMS_LIMIT,
            orderBy: { created_at: "desc" },
        }),
        prisma.clients.findMany({
            take: ITEMS_LIMIT,
            include: { orders: { select: { id: true } } },
            orderBy: { id: "desc" },
        }),
        prisma.finances.findMany({
            take: ITEMS_LIMIT,
            orderBy: { transaction_date: "desc" },
        }),
        prisma.kpis.findMany({
            take: ITEMS_LIMIT,
            orderBy: { id: "desc" },
        }),
        prisma.order_items.findMany({
            take: ITEMS_LIMIT,
            select: {
                id: true,
                order_id: true,
                product_id: true,
                quantity: true,
                price: true,
            },
            orderBy: { id: "desc" },
        }),
        prisma.orders.findMany({
            take: ITEMS_LIMIT,
            include: { order_items: { select: { id: true } } },
            orderBy: { order_date: "desc" },
        }),
        prisma.products.findMany({
            take: ITEMS_LIMIT,
            select: {
                id: true,
                name: true,
                sku: true,
                price: true,
                stock: true,
                availability_status: true,
            },
            orderBy: { id: "desc" },
        }),
        prisma.reports.findMany({
            take: ITEMS_LIMIT,
            orderBy: { generated_at: "desc" },
        }),
        prisma.settings.findMany({ take: 50 }),
        prisma.users.findMany({
            take: ITEMS_LIMIT,
            include: { reports: { select: { id: true } } },
            orderBy: { id: "desc" },
        }),
    ]);
    return {
        companies,
        activityLogs,
        clients,
        finances,
        kpis,
        orderItems,
        orders,
        products,
        reports,
        settings,
        users,
    };
}

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
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const data = await fetchDashboardData();

    if (!data) {
        return <ErrorDisplay message="Не удалось загрузить данные. Попробуйте позже." />;
    }

    const {
        companies,
        activityLogs,
        clients,
        finances,
        kpis,
        orderItems,
        orders,
        products,
        reports,
        settings,
        users,
    } = data;

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

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Компании</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Название</TableHead>
                                <TableHead>Адрес</TableHead>
                                <TableHead>Пользователей</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.map((c) => (
                                <TableRow key={c.id} className="hover:bg-gray-100">
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.address ?? "Нет адреса"}</TableCell>
                                    <TableCell>{c.users.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Логи активности</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Действие</TableHead>
                                <TableHead>Детали</TableHead>
                                <TableHead>Дата и время</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activityLogs.map((log) => (
                                <TableRow key={log.id} className="hover:bg-gray-100">
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                    <TableCell>{log.created_at?.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Клиенты</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Имя</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Кол-во заказов</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((c) => (
                                <TableRow key={c.id} className="hover:bg-gray-100">
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.activity_status}</TableCell>
                                    <TableCell>{c.orders.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

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
                                    <TableCell>{f.transaction_date.toLocaleDateString()}</TableCell>
                                    <TableCell>{f.type}</TableCell>
                                    <TableCell>{f.amount?.toString() ?? "0"}</TableCell>
                                    <TableCell>{f.category ?? "нет категории"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>KPI</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Категория</TableHead>
                                <TableHead>Название</TableHead>
                                <TableHead>Цель</TableHead>
                                <TableHead>Факт</TableHead>
                                <TableHead>Статус</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpis.map((k) => (
                                <TableRow key={k.id} className="hover:bg-gray-100">
                                    <TableCell>{k.category}</TableCell>
                                    <TableCell>{k.name}</TableCell>
                                    <TableCell>{k.target_value?.toString() ?? "N/A"}</TableCell>
                                    <TableCell>{k.actual_value?.toString() ?? "N/A"}</TableCell>
                                    <TableCell>{k.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Позиции заказов</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Заказ №</TableHead>
                                <TableHead>Товар №</TableHead>
                                <TableHead>Кол-во</TableHead>
                                <TableHead>Цена</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderItems.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-100">
                                    <TableCell>{item.order_id ?? "N/A"}</TableCell>
                                    <TableCell>{item.product_id ?? "N/A"}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price.toString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Заказы</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Клиент №</TableHead>
                                <TableHead>Дата</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Позиции</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-gray-100">
                                    <TableCell>{order.client_id ?? "N/A"}</TableCell>
                                    <TableCell>{order.order_date.toLocaleString()}</TableCell>
                                    <TableCell>{order.status ?? "N/A"}</TableCell>
                                    <TableCell>{order.order_items.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Товары</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Название</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Цена</TableHead>
                                <TableHead>Остаток</TableHead>
                                <TableHead>Статус</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow key={p.id} className="hover:bg-gray-100">
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.sku}</TableCell>
                                    <TableCell>{p.price?.toString() ?? "N/A"}</TableCell>
                                    <TableCell>{p.stock ?? 0}</TableCell>
                                    <TableCell>{p.availability_status ?? "Неизвестен"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Отчёты</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Название</TableHead>
                                <TableHead>Формат</TableHead>
                                <TableHead>Дата создания</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((r) => (
                                <TableRow key={r.id} className="hover:bg-gray-100">
                                    <TableCell>{r.report_name}</TableCell>
                                    <TableCell>{r.format ?? "pdf"}</TableCell>
                                    <TableCell>{r.generated_at?.toLocaleString() ?? "N/A"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Настройки</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ключ</TableHead>
                                <TableHead>Значение</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {settings.map((s) => (
                                <TableRow key={s.id} className="hover:bg-gray-100">
                                    <TableCell>{s.key}</TableCell>
                                    <TableCell>{s.value ?? "Нет значения"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Пользователи</h2>
                <div className="overflow-x-auto rounded border border-gray-300 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Имя</TableHead>
                                <TableHead>Логин</TableHead>
                                <TableHead>Роль</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Отчёты</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id} className="hover:bg-gray-100">
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.login}</TableCell>
                                    <TableCell>{u.role ?? "Пользователь"}</TableCell>
                                    <TableCell>{u.status ?? "Активен"}</TableCell>
                                    <TableCell>{u.reports.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </main>
    );
}
