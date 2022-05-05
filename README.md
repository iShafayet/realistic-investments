# Realistic Investments

Get thorough profit/depreciation calculation of investments and savings that takes inflation, taxes, and wealth taxes into account.

<p>
  Simply fill up an easy, self-explanatory form and get projections instantly. The algorithm can take into account -
</p>
<ul>
  <li>Your capital</li>
  <li>Your projected profit (from Investment / Mudarabah / Interest)</li>
  <li>Taxes on your profit</li>
  <li>Periodic deposit (like a savings scheme/recurring investment)</li>
  <li>Periodic withdrawal (i.e. living off of profit)</li>
  <li>Your country's inflation rate</li>
</ul>

## For users

This service is available at [https://ishafayet.github.io/realistic-investments](https://ishafayet.github.io/realistic-investments)

## For developers

We don't recommend running it directly on your development machine. Use the following instruction to run it in a virtual server instance.

1. Get [Vagrant](https://www.vagrantup.com/) and [Oracle VirtualBox](https://www.virtualbox.org/)
2. Inside this repository, run `vagrant up`. (On windows, run as admin)
3. Run `vagrant ssh`
4. Run `cd realistic-investments`
5. Run `npm run dev`
6. The default server URL is [`http://192.168.33.102:8080`](http://192.168.33.102:8080)


## Author and License

License: [MIT LICENSE](LICENSE)

2022 © [Sayem Shafayet](https://ishafayet.me)
