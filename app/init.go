package app

import (
	"encoding/json"
	"github.com/shaoshing/train"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/revel/revel"
)

type EnvMode string

const (
	ENV_LOCAL      EnvMode = "env_local"
	ENV_DEV_SERVER EnvMode = "env_dev_server"
	ENV_PRODUCTION EnvMode = "env_production"
	ENV_CN         EnvMode = "env_cn"
)

var (
	serverBasePath = os.Getenv("GOPATH") + "/src/github.com/kobeld/qor-chat-demo/conf"
)

func init() {
	// Filters is the default set of global filters.
	revel.Filters = []revel.Filter{
		revel.PanicFilter,             // Recover from panics and display an error page instead.
		revel.RouterFilter,            // Use the routing table to select the right Action
		revel.FilterConfiguringFilter, // A hook for adding or removing per-Action filters.
		revel.ParamsFilter,            // Parse parameters into Controller.Params.
		revel.SessionFilter,           // Restore and write the session cookie.
		revel.FlashFilter,             // Restore and write the flash cookie.
		revel.ValidationFilter,        // Restore kept validation errors and save new ones from cookie.
		revel.I18nFilter,              // Resolve the requested language
		HeaderFilter,                  // Add some security based headers
		revel.InterceptorFilter,       // Run interceptors around the action.
		revel.CompressFilter,          // Compress the result.
		revel.ActionInvoker,           // Invoke the action.
	}

	// register startup functions with OnAppStart
	revel.OnAppStart(installFuncMaps)
	revel.OnAppStart(installHandlers)
}

// TODO turn this into revel.HeaderFilter
// should probably also have a filter for CSRF
// not sure if it can go in the same filter or not
var HeaderFilter = func(c *revel.Controller, fc []revel.Filter) {
	// Add some common security headers
	c.Response.Out.Header().Add("X-Frame-Options", "SAMEORIGIN")
	c.Response.Out.Header().Add("X-XSS-Protection", "1; mode=block")
	c.Response.Out.Header().Add("X-Content-Type-Options", "nosniff")

	fc[0](c, fc[1:]) // Execute the next filter stage.
}

func installFuncMaps() {
	revel.TemplateFuncs["javascript_tag"] = train.JavascriptTag
	revel.TemplateFuncs["stylesheet_tag"] = train.StylesheetTag
	revel.TemplateFuncs["stylesheet_tag_with_param"] = train.StylesheetTagWithParam

	revel.TemplateFuncs["server_configs"] = serverConfigs
}

func installHandlers() {
	var (
		serveMux     = http.NewServeMux()
		revelHandler = revel.Server.Handler
	)

	serveMux.Handle("/", revelHandler)
	train.ConfigureHttpHandler(serveMux)
	revel.Server.Handler = serveMux

}

type ServerConfigs struct {
	HttpHost, WsHost string
}

func serverConfigs() (r ServerConfigs) {
	switch detectEnv() {
	case ENV_LOCAL:
		r.HttpHost = "http://localhost:3000"
		r.WsHost = "ws://localhost:3000"
	case ENV_DEV_SERVER:
		r.HttpHost = "http://chat_server.qortex.theplant-dev.com"
		r.WsHost = "ws://chat_server.qortex.theplant-dev.com"
	case ENV_CN:
		// TODO
	case ENV_PRODUCTION:
		// TODO
	default:
		// TODO
	}
	return
}

func detectEnv() EnvMode {
	envf, err := os.OpenFile(serverBasePath+"/env.json", os.O_RDONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer envf.Close()

	var readBytes []byte
	readBytes, err = ioutil.ReadAll(envf)
	if err != nil {
		panic(err)
	}

	var se struct {
		ENV string
	}

	err = json.Unmarshal(readBytes, &se)
	if err != nil {
		panic(err)
	}

	return EnvMode(se.ENV)
}
