import HeaderBox from '@/components/dashboard/HeaderBox'
import SubscriptionCards from '@/components/recruiter/SubscriptionCards'
import React from 'react'

function SubscriptionPage() {
  return (
    <>
    <HeaderBox
                    type="title"
                    title="Choose a Subscription Plan"
                    subtext="Choose the subscription plan that best fits your needs"
                />
                <SubscriptionCards />
    </>
  )
}

export default SubscriptionPage