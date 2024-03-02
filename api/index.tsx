import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { PinataFDK } from 'pinata-fdk'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const fdk = new PinataFDK({
  // rotate this key after development
  pinata_jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZmUxYjIyMi03ZjZlLTQ5N2ItOWJmMy01NDkwMjVlMDkzYTYiLCJlbWFpbCI6ImFydGFuZHJvaWRAZ29vZ2xlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDY4OGIxNDVmZmRmNWMyMWUyYWEiLCJzY29wZWRLZXlTZWNyZXQiOiI1MzFhYWQ3ZTQzZGJhOTcwMjMzZTI4NjljNDY4NmRjODlmMGJiMmZiZmYzMDZjNDlmZTM4M2YwMWI4OTFlMTA1IiwiaWF0IjoxNzA5MzMwMjgyfQ.fyraYPr2g71MNCm03--lzqT48wihumJsoupiz28JYRE'
})

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hubApiUrl: 'https://api.hub.wevm.dev',
  // hubApiUrl: 'https://hub.pinata.cloud',
})

app.use("/", fdk.analyticsMiddleware({
  frameId: "whoami-frog-vercel",
  customId: "https://whoami-frame.vercel.app/api"
}))

app.frame('/', (c) => {
  const { status, frameData, verified } = c
  const fid = frameData?.fid
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `You are fid ${fid}. Verified: ${verified}.`
            : 'I (will) know who you are, and track you with FDK Frame Analytics'}
        </div>
      </div>
    ),
    intents: [
      status === 'response' ? null : <Button value="letmein">Let Me In</Button>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
