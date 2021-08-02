const gatewaysArray = [
  {
    name: 'gateway_1',
    ipv4: '192.168.1.1',
    peripheral: [
      {
        vendor: 'vendor1',
        status: 'online',
      },
      {
        vendor: 'vendor2',
        status: 'online',
      },
      {
        vendor: 'vendor3',
        status: 'online',
      },
      {
        vendor: 'vendor4',
        status: 'online',
      },
      {
        vendor: 'vendor5',
        status: 'online',
      },
      {
        vendor: 'vendor6',
        status: 'online',
      },
      {
        vendor: 'vendor7',
        status: 'online',
      },
      {
        vendor: 'vendor8',
        status: 'online',
      },
      {
        vendor: 'vendor9',
        status: 'online',
      },
      {
        vendor: 'vendor10',
        status: 'online',
      },
    ],
  },
  {
    name: 'gateway_2',
    ipv4: '192.168.1.2',
    peripheral: [],
  },
]

const gateway = {
  name: 'gateway_3',
  ipv4: '192.168.1.3',
}

const gatewayWithPeripherals = {
  name: 'gateway_4',
  ipv4: '192.168.1.4',
  peripheral: [
    {
      vendor: 'vendor1',
      status: 'online',
    },
    {
      vendor: 'vendor2',
      status: 'online',
    },
    {
      vendor: 'vendor3',
      status: 'online',
    },
    {
      vendor: 'vendor4',
      status: 'online',
    },
    {
      vendor: 'vendor5',
      status: 'online',
    },
    {
      vendor: 'vendor6',
      status: 'online',
    },
    {
      vendor: 'vendor7',
      status: 'online',
    },
    {
      vendor: 'vendor8',
      status: 'online',
    },
    {
      vendor: 'vendor9',
      status: 'online',
    },
    {
      vendor: 'vendor10',
      status: 'online',
    },
  ],
}

module.exports = {
  gateway,
  gatewaysArray,
  gatewayWithPeripherals,
}
