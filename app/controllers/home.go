package controllers

import "github.com/robfig/revel"

type Home struct {
	*revel.Controller
}

func (this Home) Login() revel.Result {
	return this.Render()
}

func (this Home) Signup() revel.Result {
	return this.Render()
}
