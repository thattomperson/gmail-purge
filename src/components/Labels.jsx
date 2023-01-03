import { ChatAlt2Icon, ChatIcon, CheckIcon, DocumentTextIcon, ExclamationCircleIcon, InboxIcon, InformationCircleIcon, MailIcon, PaperAirplaneIcon, SelectorIcon, StarIcon, TagIcon, TrashIcon, UserGroupIcon, UserIcon } from '@heroicons/react/outline'
import { TagIcon as SolidTagIcon } from '@heroicons/react/solid'
import { Listbox, Transition } from "@headlessui/react"
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Icon(type) {
  switch (type) {
    case 'INBOX':
      return <InboxIcon className='w-6' />
    case 'STARRED':
      return <StarIcon className='w-6' />
    case 'IMPORTANT':
      return <TagIcon className='w-6' />
    case 'TRASH':
      return <TrashIcon className='w-6' />
    case 'DRAFT':
      return <DocumentTextIcon className='w-6' />
    case 'SPAM':
      return <ExclamationCircleIcon className='w-6' />
    case 'CHAT':
      return <ChatIcon className='w-6' />
    case 'SENT':
      return <PaperAirplaneIcon className='w-6' />
    case 'UNREAD':
      return <MailIcon className='w-6' />
    case 'CATEGORY_SOCIAL':
      return <UserGroupIcon className='w-6' />
    case 'CATEGORY_PROMOTIONS':
      return <TagIcon className='w-6' />
    case 'CATEGORY_PERSONAL':
      return <UserIcon className='w-6' />
    case 'CATEGORY_UPDATES':
      return <InformationCircleIcon className='w-6' />
    case 'CATEGORY_FORUMS':
      return <ChatAlt2Icon className='w-6' />
    default:
      return <SolidTagIcon className='w-6' />
  }
}

function Label(label) {
  switch (label) {
    case 'INBOX':
    case 'STARRED':
    case 'IMPORTANT':
    case 'TRASH':
    case 'DRAFT':
    case 'SPAM':
    case 'CHAT':
    case 'SENT':
    case 'UNREAD':
      return label.charAt(0).toUpperCase() + label.toLowerCase().slice(1)
    case 'CATEGORY_SOCIAL':
    case 'CATEGORY_PROMOTIONS':
    case 'CATEGORY_PERSONAL':
    case 'CATEGORY_UPDATES':
    case 'CATEGORY_FORUMS':
      return label.slice(9).charAt(0).toUpperCase() + label.toLowerCase().slice(10)
    default:
      return label
  }
}

export default function Labels({ labels, label, selectedAltText, onChange }) {
  return (
    <Listbox onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Select Label</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="w-full inline-flex truncate">
                {Icon(label ? label.id : null)}
                <span className="truncate">{label ? Label(label.name) : 'Select...'}</span>
                <span className="ml-2 truncate text-gray-500">{selectedAltText}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {(labels ?? []).map((label) => (
                  <Listbox.Option
                    key={label.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={label}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {Icon(label.id)}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {Label(label.name)}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}