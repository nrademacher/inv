import { CalendarIcon, CashIcon, HashtagIcon, UserIcon } from '@heroicons/react/solid'
import { InvoiceStatus } from '@prisma/client'
import classNames from 'classnames'
import dayjs from 'dayjs'

const InvoiceStatusLabel: React.FC<{ status: InvoiceStatus; isDraft: boolean }> = ({ status, isDraft }) => {
    return (
        <span
            className={classNames(
                'grid w-1/12 place-items-center rounded border py-4 text-sm font-semibold lg:text-base',
                status === InvoiceStatus.PENDING && 'border-yellow-300 bg-yellow-100 text-yellow-600',
                status === InvoiceStatus.PAID && 'border-green-300 bg-green-100 text-green-600',
                isDraft && 'border-blue-300 bg-blue-100 text-blue-600'
            )}
        >
            {isDraft ? 'Draft' : status[0] + status.slice(1).toLowerCase()}
        </span>
    )
}

export const InvoiceListing: React.FC<{
    id: number
    date: Date
    clientName: string
    total: number
    status: InvoiceStatus
    isDraft: boolean
}> = ({ id, date, clientName, total, status, isDraft }) => (
    <article className="flex w-full transform cursor-pointer items-center justify-between border border-neutral-200 bg-white px-8 py-4 transition-transform hover:scale-105">
        <span className="flex w-2/12 items-center text-xl font-semibold">
            <HashtagIcon className="mr-1 h-6 w-6 text-neutral-400" />
            {id}
        </span>
        <span className="flex w-3/12">
            <CalendarIcon className="mr-4 h-6 w-6 text-neutral-300" />
            {dayjs(date).toISOString().split('T')[0].replaceAll('-', '/')}
        </span>
        <span className="flex w-4/12 justify-self-center font-medium">
            <UserIcon className="mr-4 h-6 w-6 text-neutral-300" /> {clientName}
        </span>
        <span className="flex w-2/12 text-lg font-bold">
            <CashIcon className="mr-4 h-6 w-6 text-neutral-300" /> ${total}
        </span>
        <InvoiceStatusLabel status={status} isDraft={isDraft} />
    </article>
)
