import { Router, Request, Response, request, NextFunction } from 'express';

interface ReqWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.logedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not permitted');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
  <form method="POST">
  <div>
  <label>Email</label>
  <input name="email" />
  </div> 
  <div>
  <label>Password</label>
  <input name="password" type="password" />
  </div> 
  <button>Submit</button>
  </form>
  `);
});

router.post('/login', (req: ReqWithBody, res: Response) => {
  const { email, password } = req.body;
  console.log(email + '-' + password);

  if (email && password && email === 'sasa@sasa.com' && password === 'sasa') {
    req.session = { logedIn: true };
    res.redirect('/');
  } else {
    res.send('invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.logedIn) {
    res.send(`
<div>
<h1> You Are Logged In</h1>
<a href="/logout">Logout</a>
</div>

`);
  } else {
    res.send(`
    <div>
<h1> You Are Logged out</h1>
<a href="/login">Login</a>
</div>
    `);
  }
});
router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route');
});

export { router };
