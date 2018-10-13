async function index(ctx) {
  await ctx.render('home/index');
}

async function about(ctx) {
  await ctx.render('home/about');
}

async function dashboard(ctx) {
  await ctx.render('home/dashboard');
}

async function honorable(ctx) {
  ctx.body = '<img style="height: 100%;" src="/images/honorable.jpg">';
}


module.exports = { index, about, dashboard, honorable };
