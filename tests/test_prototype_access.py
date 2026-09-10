import urllib.request, urllib.error, json, http.cookiejar
base='http://localhost:3000'
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args): return None
jar=http.cookiejar.CookieJar()
client=urllib.request.build_opener(NoRedirect,urllib.request.HTTPCookieProcessor(jar))
def req(path,method='GET',data=None,headers=None):
 h=headers or {}
 if method!='GET':h={'Origin':base,'Content-Type':'application/json',**h}
 r=urllib.request.Request(base+path,data=json.dumps(data).encode() if data is not None else None,method=method,headers=h)
 try:res=client.open(r)
 except urllib.error.HTTPError as e:res=e
 return res.code,res.headers,res.read()
paths=['/cases/coinflix','/cases/ascy','/cases/lumio-couples','/cases/pearl','/cases/trucking','/cases/semaverse','/cases/rainforest','/cases/simcare','/cases/cloudbilling','/cases/causal-labs','/semaverse','/pearl','/welltrax','/rainforest','/cloudbilling','/simcare','/simcare/courses','/causal-brain','/design-room']
for p in paths:
 status,h,b=req(p)
 assert status==307 and '/nda-access?' in h.get('Location',''),(p,status)
 assert 'no-store' in h.get('Cache-Control',''),p
for p in ['/','/cases','/nda-access']:
 assert req(p)[0]==200,p
assert req('/cases/coinflix?_rsc=check',headers={'RSC':'1'})[0]==307
assert req('/pearl',headers={'Cookie':'portfolio_prototype_access=666666'})[0]==307
assert req('/api/prototype-access','POST',{'code':'123456'})[0]==401
assert not list(jar)
assert req('/api/prototype-access','POST',{'code':'666666'}, {'Origin':'https://other.invalid'})[0]==403
status,h,b=req('/api/prototype-access','POST',{'code':'666666'})
assert status==200,(status,b)
assert 'HttpOnly' in h.get('Set-Cookie','') and 'samesite=strict' in h.get('Set-Cookie','').lower()
for p in ['/cases/coinflix','/cases/ascy','/pearl','/simcare/courses']:
 status,h,b=req(p)
 assert status==200,(p,status,b[:100])
 assert 'no-store' in h.get('Cache-Control',''),p
assert req('/api/prototype-access','DELETE')[0]==200
assert req('/pearl')[0]==307
print('PASS: 19 protected routes, public landing/archive, RSC requests, forged cookie, wrong code, cross-origin request, correct code, authenticated pages and logout.')
