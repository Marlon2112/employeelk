import { z } from 'zod';

export const validationSchema = z.object({
	email: z.string().min(1, 'Email сотрудника обязателен для заполнения').email('Некорректный формат email'),
	fullName: z.string().min(1, 'ФИО сотрудника обязателен для заполнения'),
	salary: z.number('Оклад должен быть положительным числом').min(1, 'Оклад сотрудника обязателен для заполнения'),
});

export type FormValues = z.infer<typeof validationSchema>;
