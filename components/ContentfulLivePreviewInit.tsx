'use client'

import { useEffect } from 'react'
import { ContentfulLivePreview } from '@contentful/live-preview'

export default function ContentfulLivePreviewInit() {
    useEffect(() => {
        ContentfulLivePreview.init({
            locale: 'sv-SE',
            enableInspectorMode: true,
            enableLiveUpdates: true,
            debugMode: true,
        })
    }, [])

    return null
}