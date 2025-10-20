import React from "react";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const sectionStyle: React.CSSProperties = {
    backgroundColor: "#e6f0ff",
    borderRadius: "8px",
    padding: "15px 20px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0, 78, 255, 0.2)"
};

const headingStyle: React.CSSProperties = {
    color: "#004eff",
    borderBottom: "2px solid #000000",
    paddingBottom: "6px",
    marginBottom: "12px",
    fontWeight: "600",
    fontSize: "1.4rem"
};

const listItemStyle: React.CSSProperties = {
    padding: "6px 0",
    borderBottom: "1px solid #000000",
    fontSize: "1rem",
    color: "#000000"
};

const mainStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#002080",
    lineHeight: 1.5,
};

export default async function DashboardPage() {
    const companies = await prisma.company.findMany({ include: { users: true } });
    const activityLogs = await prisma.activity_logs.findMany();
    const clients = await prisma.clients.findMany({ include: { orders: true } });
    const finances = await prisma.finances.findMany();
    const kpis = await prisma.kpis.findMany();
    const orderItems = await prisma.order_items.findMany({ include: { orders: true, products: true } });
    const orders = await prisma.orders.findMany({ include: { clients: true, order_items: true } });
    const products = await prisma.products.findMany({ include: { order_items: true } });
    const reports = await prisma.reports.findMany({ include: { users: true } });
    const settings = await prisma.settings.findMany();
    const users = await prisma.users.findMany({ include: { reports: true, companies: true } });

    return (
        <main style={mainStyle}>
            <h1 style={{ ...headingStyle, fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>Dashboard Data</h1>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Компании</h2>
                <ul>
                    {companies.map((c) => (
                        <li key={c.id} style={listItemStyle}>
                            <strong>{c.name}</strong> — {c.address ?? "Нет адреса"} — Пользователей: {c.users.length}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Логи активности</h2>
                <ul>
                    {activityLogs.map((log) => (
                        <li key={log.id} style={listItemStyle}>
                            {log.action} — {log.details} — {log.created_at?.toLocaleString()}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Клиенты</h2>
                <ul>
                    {clients.map((client) => (
                        <li key={client.id} style={listItemStyle}>
                            <strong>{client.name}</strong> — Статус: {client.activity_status} — Заказов: {client.orders.length}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Финансы</h2>
                <ul>
                    {finances.map((f) => (
                        <li key={f.id} style={listItemStyle}>
                            {f.transaction_date.toLocaleDateString()} — {f.type} — {f.amount?.toString() ?? "0"} ({f.category ?? "нет категории"})
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>KPI</h2>
                <ul>
                    {kpis.map((k) => (
                        <li key={k.id} style={listItemStyle}>
                            {k.category} — {k.name} — Цель: {k.target_value?.toString() ?? "N/A"} — Факт: {k.actual_value?.toString() ?? "N/A"} — Статус: {k.status}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Позиции заказов</h2>
                <ul>
                    {orderItems.map((item) => (
                        <li key={item.id} style={listItemStyle}>
                            Заказ №{item.order_id ?? "N/A"} — Товар №{item.product_id ?? "N/A"} — Кол-во: {item.quantity} — Цена: {item.price.toString()}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Заказы</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} style={listItemStyle}>
                            Клиент №{order.client_id ?? "N/A"} — Дата: {order.order_date.toLocaleString()} — Статус: {order.status ?? "N/A"} — Позиции: {order.order_items.length}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Товары</h2>
                <ul>
                    {products.map((p) => (
                        <li key={p.id} style={listItemStyle}>
                            {p.name} (SKU: {p.sku}) — Цена: {p.price?.toString() ?? "N/A"} — Остаток: {p.stock ?? 0} — Статус: {p.availability_status ?? "Неизвестен"}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Отчёты</h2>
                <ul>
                    {reports.map((r) => (
                        <li key={r.id} style={listItemStyle}>
                            {r.report_name} — Формат: {r.format ?? "pdf"} — Сгенерирован: {r.generated_at?.toLocaleString() ?? "N/A"}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Настройки</h2>
                <ul>
                    {settings.map((s) => (
                        <li key={s.id} style={listItemStyle}>
                            {s.key}: {s.value ?? "Нет значения"}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Пользователи</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={listItemStyle}>
                            {user.name} — Логин: {user.login} — Роль: {user.role ?? "Пользователь"} — Статус: {user.status ?? "Активен"} — Отчётов: {user.reports.length}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
